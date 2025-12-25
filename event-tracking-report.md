# Event tracking report

This document lists all PostHog events that have been automatically added to your Next.js application.

## Events by File

### components\EventCard.tsx

- **team-card-clicked**: Fired when a user clicks on a team card to view its details.

### components\EventsCard.tsx

- **event-card-clicked**: Fired when a user clicks on an event card to view its details. Properties include the event's title, slug, location, date, and time.

### components\ExploreBtn.tsx

- **explore_events_clicked**: User clicked the 'Explore Events' button to navigate to the events section on the page.

### components\NavBar.tsx

- **navbar_logo_clicked**: User clicked on the logo in the navigation bar.
- **navbar_link_clicked**: User clicked on a text link in the navigation bar.

### components\PixelBlast.tsx

- **pixel-blast-interacted**: User clicked or tapped on the PixelBlast interactive background, creating a ripple or liquid effect.


## Events still awaiting implementation
- (human: you can fill these in)
---

## Next Steps

1. Review the changes made to your files
2. Test that events are being captured correctly
3. Create insights and dashboards in PostHog
4. Make a list of events we missed above. Knock them out yourself, or give this file to an agent.

Learn more about what to measure with PostHog and why: https://posthog.com/docs/new-to-posthog/getting-hogpilled
