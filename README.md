# Calendar demo

This project is something I build as part of a take-home exercise. It relies on ChatGPT to parse
natural language and create new calendar events. Editing events is done using traditional UI
elements (e.g., a form).

**Calendar View** ![calendar view](./public/calendar-view.png 'Calendar View')

**Meeting Details View**
![meeting details view](./public/meeting-details-view.png 'Meeting Details View')

# Scope and Design

-   For the UX, I tackled this problem by largely relying upon the design I'm familiar with from
    Google Calendar. This included building out:
    -   Day and date presentation with UI controls to go to "Today" and navigate to other days one
        day at a time.
    -   A calendar widget that shows the full month with highlights for "Today" and for the selected
        date, and controls to navigate to other months one month at a time
    -   Presentation of the user's calendar for a single day separated into 24 hour blocks. Meetings
        for the day are presented within this view and adapt based on the start time, duration, and
        meeting conflicts.
    -   Presentation of the details for a single meeting with the ability to edit any of the fields.
        This is accessible by clicking on the meeting preview for a given day.
        -   The title and invitees are plain text fields
        -   The start date/time are provided via the calendar widget and a `select` element with
            discrete options for the start time to ensure a valid start time is entered at the cost
            of free-form text that would require input validation
        -   The duration is a `select` input with discrete options (similarly ensuring valid data is
            provided at the expense of free-form input)
        -   The video option is also a `select` allowing for any of the options originally available
            in the hardcoded.json file
    -   A new meeting view with free-form text input for the user to describe new meetings via
        natural language that get processed by the GPT API
-   This scope, while large, felt like a solid baseline of functionality one might expect from a
    calendar app. Some things I excluded were:
    -   week/month views
    -   highlighting days in the calendar widget that had meetings scheduled
    -   drag-drop to edit meeting start time/duration
    -   UI responsiveness for large and small screens
    -   accessibility
    -   a test pyramid
-   For styling opted for Tailwind which gave me an out-of-the-box CSS reset along with a variety of
    color, spacing, text, and layout utilities, which ultimately meant I didn't have to write a
    single line of custom CSS.
    -   Tailwind also offers an Icon library with React component exports which came in handy for
        button and form controls
-   State management is largely done via Redux leveraging the Redux Toolkit library to abstract
    certain aspects of setting up slices within your store. Ultimately I only have one slice called
    `calendar` which holds the meeting and date state. Local state is used as needed (e.g., the
    temporary state for editing a meeting).
    -   At app start the `hardcoded.json` file is ingested to populate the initial calendar state. I
        adjusted the meetings to start in December 2023 so they'd be easily accessible.
    -   The app initializes to "today" when first rendered.
-   At the start of the project I converted the app to Typescript and added Prettier to better catch
    bugs at build time and provide documentation via the typings, as well as general formatting for
    sanity's sake.
