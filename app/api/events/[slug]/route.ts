import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Event, EventDoc } from '@/database/event.model';

/**
 * Route parameters for /api/events/[slug].
 */
interface GetEventBySlugParams {
  slug?: string;
}

/**
 * Shape of a successful response body.
 */
interface GetEventBySlugSuccessResponse {
  message: string;
  event: EventDoc;
}

/**
 * Shape of an error response body.
 */
interface ErrorResponseBody {
  message: string;
  error?: string;
}

export type GetEventBySlugResponseBody =
  | GetEventBySlugSuccessResponse
  | ErrorResponseBody;

/**
 * GET /api/events/[slug]
 *
 * Returns a single event identified by its URL slug.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<GetEventBySlugParams> },
): Promise<NextResponse<GetEventBySlugResponseBody>> {
  try {
    const { slug: rawSlug } = await params;

    // Validate presence and basic shape of the slug parameter.
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

    // Enforce a URL-safe slug format to avoid unexpected queries.
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

    // Ensure a stable MongoDB connection before querying.
    await connectToDatabase();

    const event: EventDoc | null = await Event.findOne({ slug }).exec();

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${slug}" was not found.` },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: 'Event fetched successfully.',
        event,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    // Log server-side for observability without leaking internal details to the client.
    console.error('Failed to fetch event by slug:', error);

    return NextResponse.json(
      {
        message: 'Failed to fetch event.',
      },
      { status: 500 },
    );
  }
}
