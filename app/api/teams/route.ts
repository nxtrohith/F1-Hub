import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Teams, TeamDoc } from '@/database/teams.model';
import { v2 as cloudinary } from 'cloudinary';

/**
 * Shape of a successful response body for fetching all teams.
 */
interface GetAllTeamsSuccessResponse {
  message: string;
  teams: TeamDoc[];
  count: number;
}

/**
 * Shape of a successful response body for creating a team.
 */
interface CreateTeamSuccessResponse {
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

export type GetAllTeamsResponseBody =
  | GetAllTeamsSuccessResponse
  | ErrorResponseBody;

export type CreateTeamResponseBody =
  | CreateTeamSuccessResponse
  | ErrorResponseBody;

/**
 * GET /api/teams
 *
 * Returns all teams sorted alphabetically by team name.
 * Supports optional query parameters:
 * - limit: Maximum number of teams to return
 * - skip: Number of teams to skip (for pagination)
 */
export async function GET(
  req: NextRequest,
): Promise<NextResponse<GetAllTeamsResponseBody>> {
  try {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get('limit');
    const skipParam = searchParams.get('skip');

    let limit: number | undefined;
    if (limitParam) {
      limit = parseInt(limitParam, 10);
      if (isNaN(limit) || limit < 1) {
        return NextResponse.json(
          { message: 'The "limit" parameter must be a positive integer.' },
          { status: 400 },
        );
      }
    }

    let skip: number | undefined;
    if (skipParam) {
      skip = parseInt(skipParam, 10);
      if (isNaN(skip) || skip < 0) {
        return NextResponse.json(
          { message: 'The "skip" parameter must be a non-negative integer.' },
          { status: 400 },
        );
      }
    }

    await connectToDatabase();

    let query = Teams.find().sort({ teamname: 1 });

    if (skip !== undefined) {
      query = query.skip(skip);
    }

    if (limit !== undefined) {
      query = query.limit(limit);
    }

    const teams: TeamDoc[] = await query.exec();
    const count = await Teams.countDocuments().exec();

    return NextResponse.json(
      {
        message: 'Teams fetched successfully.',
        teams,
        count,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error('Failed to fetch teams:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unexpected error occurred.';

    return NextResponse.json(
      {
        message: 'Failed to fetch teams.',
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}

/**
 * Uploads a file to Cloudinary using stream (same pattern as events route).
 */
const uploadToCloudinary = async (
  file: File,
  folder: string,
): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: 'image', folder: `teams/${folder}` },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result as { secure_url: string });
          }
        },
      )
      .end(buffer);
  });

  return uploadResult.secure_url;
};

/**
 * Required string fields for creating a team.
 */
const REQUIRED_STRING_FIELDS = [
  'teamname',
  'driver1',
  'driver2',
  'carmodel',
  'firstentry',
  'headquarters',
  'chief',
  'powerunit',
  'championships',
  'driver1cha',
  'driver2cha',
] as const;

/**
 * Required image fields for creating a team.
 */
const REQUIRED_IMAGE_FIELDS = [
  'carimage',
  'teamlogo',
  'driver1img',
  'driver2img',
] as const;

/**
 * POST /api/teams
 *
 * Creates a new team using FormData (same pattern as events route).
 * Image fields are uploaded to Cloudinary.
 *
 * FormData fields:
 * - teamname, driver1, driver2, carmodel, firstentry, headquarters, chief, powerunit, championships, driver1cha, driver2cha (strings)
 * - carimage, teamlogo, driver1img, driver2img (File)
 */
export async function POST(
  req: NextRequest,
): Promise<NextResponse<CreateTeamResponseBody>> {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    // Validate required string fields
    const missingFields: string[] = [];
    const teamData: Record<string, string> = {};

    for (const field of REQUIRED_STRING_FIELDS) {
      const value = formData.get(field);
      if (!value || typeof value !== 'string' || !value.trim()) {
        missingFields.push(field);
      } else {
        teamData[field] = value.trim();
      }
    }

    // Validate required image fields
    const imageFiles: Record<string, File> = {};
    for (const field of REQUIRED_IMAGE_FIELDS) {
      const file = formData.get(field) as File | null;
      if (!file || !(file instanceof File)) {
        missingFields.push(field);
      } else {
        imageFiles[field] = file;
      }
    }

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(', ')}.` },
        { status: 400 },
      );
    }

    // Upload images to Cloudinary (same pattern as events route)
    const [carImageUrl, teamLogoUrl, driver1ImgUrl, driver2ImgUrl] =
      await Promise.all([
        uploadToCloudinary(imageFiles.carimage, 'cars'),
        uploadToCloudinary(imageFiles.teamlogo, 'logos'),
        uploadToCloudinary(imageFiles.driver1img, 'drivers'),
        uploadToCloudinary(imageFiles.driver2img, 'drivers'),
      ]);

    // Create new team (slug is auto-generated by pre-save hook)
    const team = await Teams.create({
      teamname: teamData.teamname,
      driver1: teamData.driver1,
      driver2: teamData.driver2,
      carmodel: teamData.carmodel,
      carimage: carImageUrl,
      firstentry: teamData.firstentry,
      headquarters: teamData.headquarters,
      teamlogo: teamLogoUrl,
      driver1img: driver1ImgUrl,
      driver2img: driver2ImgUrl,
      driver1cha: teamData.driver1cha,
      driver2cha: teamData.driver2cha,
      chief: teamData.chief,
      powerunit: teamData.powerunit,
      championships: teamData.championships,
    });

    return NextResponse.json(
      {
        message: 'Team created successfully.',
        team,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error('Failed to create team:', error);

    // Handle duplicate slug error
    if (
      error instanceof Error &&
      'code' in error &&
      (error as { code: number }).code === 11000
    ) {
      return NextResponse.json(
        {
          message: 'A team with this name already exists.',
          error: 'Duplicate slug detected.',
        },
        { status: 409 },
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : 'Unexpected error occurred.';

    return NextResponse.json(
      {
        message: 'Failed to create team.',
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
