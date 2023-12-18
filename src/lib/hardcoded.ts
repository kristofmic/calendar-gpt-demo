export const hardcoded = [
    {
        input: 'Create a 45 minute zoom meeting on December 9th at 10am about the product launch. Include Elaine and Fatima',
        output: {
            TITLE: 'Product launch',
            ATTENDEES: 'Me, Elaine, Fatima',
            START_TIME: '2023-12-09T10:00:00',
            DURATION: 45,
            VIDEO: 'ZOOM',
        },
    },
    {
        input: 'New meeting on December 20th at 3pm between me and David',
        output: {
            TITLE: 'Me <> David',
            ATTENDEES: 'Me, David',
            START_TIME: '2023-12-20T15:00:00',
            DURATION: 30,
            VIDEO: 'NONE',
        },
    },
    {
        input: 'Create a short team-wide meeting at 2pm this Friday. Someone might need to zoom in.',
        output: {
            TITLE: 'Team Meeting',
            ATTENDEES: 'Me, Alice, Bob, Charlie, David, Elaine, Fatima, Geoffrey',
            START_TIME: '2023-12-09T14:00:00',
            DURATION: 30,
            VIDEO: 'ZOOM',
        },
    },
    {
        input: 'Create a 1 hour long meeting at 9am tomorrow for me to plan.',
        output: {
            TITLE: 'Planning Meeting',
            ATTENDEES: 'Me',
            START_TIME: '2023-12-10T09:00:00',
            DURATION: 60,
            VIDEO: 'NONE',
        },
    },
    {
        input: 'Set up a meeting tomorrow at 2:30pm tomorrow for me and Danielle',
        output: {
            TITLE: 'Me <> Danielle',
            ATTENDEES: 'Me, Danielle',
            START_TIME: '2023-12-11T14:30:00',
            DURATION: 30,
            VIDEO: 'NONE',
        },
    },
    {
        input: 'Invite everyone to a new 1 hour all-hands to start off the week next week. Have it at the beginning of the day',
        output: {
            TITLE: 'All-Hands Meeting',
            ATTENDEES: 'Me, Alice, Bob, Charlie, David, Elaine, Fatima, Geoffrey',
            START_TIME: '2023-12-12T09:00:00',
            DURATION: 60,
            VIDEO: 'NONE',
        },
    },
    {
        input: "Everybody on the team but Bob needs to get together for an hour after work on Thursday to plan his surprise party. Geoffrey shouldn't be invited because he will ruin the surprise",
        output: {
            TITLE: 'Surprise Party Planning',
            ATTENDEES: 'Me, Alice, Charlie, David, Elaine, Fatima',
            START_TIME: '2023-12-15T18:00:00',
            DURATION: 60,
            VIDEO: 'NONE',
        },
    },
    {
        input: 'Setup an interview with Sylvia next week Monday at 2pm. Include a Google meet invite.',
        output: {
            TITLE: 'Interview with Sylvia',
            ATTENDEES: 'Me, Sylvia',
            START_TIME: '2023-12-12T14:00:00',
            DURATION: 60,
            VIDEO: 'MEET',
        },
    },
];
