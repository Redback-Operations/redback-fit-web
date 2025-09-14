## Summary

What is the nature of this pull request?

- [ ] New feature
- [X] Enhancement to an existing feature
- [X] Bug fix
- [ ] Configuration update
- [ ] Dependency update

### Description of change
This PR refines theme handling across the Dashboard and resolves visibility issues in dark mode.

## Main updates

Theming: Extended global.css to better support dark mode in .dashboardContent, covering inputs, tables, icons, and form fields while leaving chart primitives unaffected.

Layout: Adjusted Dashboard.module.css header styles (.searchAndIcons, .searchInput, .bellIcon, .profileIcon) to prevent crowding and align items consistently.

Reports: Removed background overrides and ensured icons/text inherit theme colors.

Recovery Tracker: Wrapped content in dashboardContent, restyled alerts and tips, and fixed table readability in dark mode.

Weekly Summary: Applied dashboardContent wrapper, updated cards and table styles, and improved Chart.js text and legend visibility.

My Friends: Styled list items and modals so names and buttons display correctly in dark mode.

Sidebar branding: Fixed “ReflexionPro” logo text so it remains visible under both themes.

## Bugs fixed

Missing or unreadable text/icons in dark mode across Reports, Recovery Tracker, Weekly Summary, and My Friends.

Low-contrast training tables in dark mode.

Overlapping icons near the search bar.

### Planner card link
https://teams.microsoft.com/l/entity/com.microsoft.teamspace.tab.planner/planner.v1.a23fdaa2-8358-4081-bc5f-b973b2f39724_p_48WR8Dr3OUaCYJbEh12J4sgAH4QK?tenantId=d02378ec-1688-46d5-8540-1c28b5f470f6&webUrl=https%3A%2F%2Ftasks.teams.microsoft.com%2Fteamsui%2FpersonalApp%2Falltasklists&context=%7B%22subEntityId%22%3A%22%2Fv1%2Fplan%2F48WR8Dr3OUaCYJbEh12J4sgAH4QK%2Fview%2Fboard%2Ftask%2FsGt08fdCU0yb3HcghcoRzMgAI-HR%22%2C%22channelId%22%3A%2219%3Af669075517744b56900cfe4bed09a24a%40thread.tacv2%22%7D

## Readiness

- [X] The application runs successfully with my change.
- [X] I have included [code comments](https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments/) where appropriate.
- [ ] Where I have copied and pasted code from other sources, I have included a comment with a link to the original source.
- [X] I have read and followed the [principles and guidelines about submitting code](https://redback-operations.github.io/redback-documentation/docs/web-mobile-app-dev/frontend/submitting-work).
- [ ] I have added [unit tests](https://redback-operations.github.io/redback-documentation/docs/web-mobile-app-dev/frontend/tests) for new components and/or functionality.
- [X] All existing and new unit tests pass (including updating tests for any necessary breaking changes).
