import TeamCard from '@/components/TeamCard'
import { getBaseUrl } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import React, { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

const TeamDetailsContent = async ({ params }: { params: Promise<{ slug: string }> }) => {
    // Await params inside Suspense boundary
    const { slug } = await params;
    
    // Opt into dynamic rendering
    await connection();
    
    const baseUrl = getBaseUrl();
    const request = await fetch(new URL(`/api/teams/${slug}`, baseUrl).toString(), { cache: "no-store" });
    
    if (!request.ok) return notFound();
    
    const data = await request.json();
    const team = data?.team;
    
    if (!team) return notFound();

    return (
        <div>
            <TeamCard {...team} />
        </div>
    )
}

const TeamDetailsPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <TeamDetailsContent params={params} />
      </Suspense>
    </div>
  )
}

export default TeamDetailsPage