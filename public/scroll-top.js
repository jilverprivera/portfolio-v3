// Loading a page always starts at the top instead of where it was left or at a #section in the URL.
// The script loads async, so the browser may already have jumped to the #section: it goes back up once the page has loaded.
history.scrollRestoration = "manual";
if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
scrollTo(0, 0);
if (document.readyState !== "complete") addEventListener("load", () => scrollTo(0, 0), { once: true });
