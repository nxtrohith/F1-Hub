import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Teams, TeamDoc } from '@/database/teams.model';

/**
 * Route parameters for /api/teams/[slug].
 */
interface GetTeamBySlugParams {
  slug?: string;
}

/**
 * Shape of a successful response body.
 */
interface GetTeamBySlugSuccessResponse {
  message: string;
  team: TeamDoc;
}

/**
 * Shape of an error response body.
 */
interface ErrorResponseBody {
  message: string;
  error?: string;
}

export type GetTeamBySlugResponseBody =
  | GetTeamBySlugSuccessResponse
  | ErrorResponseBody;

/**
 * GET /api/teams/[slug]
 *
 * Returns a single team identified by its URL slug.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<GetTeamBySlugParams> },
): Promise<NextResponse<GetTeamBySlugResponseBody>> {
  try {
    const { slug: rawSlug } = await params;

    // Validate presence and basic shape of the slug parameter
    if (!rawSlug) {
      return NextResponse.json(
        { message: 'The "slug" route parameter is required.' },
        { status: 400 },
      );
    }

    if (typeof rawSlug !== 'string') {
      return NextResponse.json(
        { message: 'The "slug" route parameter must be a string.' },
        { status: 400 },
      );
    }

    const slug = rawSlug.trim().toLowerCase();

    if (!slug) {
      return NextResponse.json(
        { message: 'The "slug" route parameter must not be whitespace only.' },
        { status: 400 },
      );
    }

    // Enforce a URL-safe slug format to avoid unexpected queries
    const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!SLUG_PATTERN.test(slug)) {
      return NextResponse.json(
        {
          message:
            'The "slug" route parameter is invalid. Expected a URL-safe slug (lowercase letters, numbers, and dashes).',
        },
        { status: 400 },
      );
    }

    // Ensure a stable MongoDB connection before querying
    await connectToDatabase();

    const team: TeamDoc | null = await Teams.findOne({ slug }).exec();

    if (!team) {
      return NextResponse.json(
        { message: `Team with slug "${slug}" was not found.` },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: 'Team fetched successfully.',
        team,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    // Log server-side for observability without leaking internal details
    console.error('Failed to fetch team by slug:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unexpected error occurred.';

    return NextResponse.json(
      {
        message: 'Failed to fetch team.',
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}