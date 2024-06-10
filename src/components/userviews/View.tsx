// Import required modules
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

// Set up OAuth2 client
const oAuth2Client = new OAuth2Client({
  clientId: 'YOUR_CLIENT_ID178883293662-0omgd6hj8c3tvhc0loksdqahgk227p4f.apps.googleusercontent.com',
  clientSecret: 'YGOCSPX-gZxRdQm5HGhx5lE9JKRlqDrqrUr_',
  redirectUri: 'YOUR_REDIRECT_URI',
});

// Set up authentication credentials
oAuth2Client.setCredentials({
  access_token: 'YOUR_ACCESS_TOKEN',
  refresh_token: 'YOUR_REFRESH_TOKEN',
});

// Set up Google Analytics Reporting API
const analyticsreporting = google.analyticsreporting({
  version: 'v4',
  auth: oAuth2Client,
});

// Fetch total pageviews
async function getTotalPageviews() {
  try {
    const res = await analyticsreporting.reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId: 'YOUR_VIEW_ID',
            dateRanges: [{ startDate: '2022-01-01', endDate: 'today' }],
            metrics: [{ expression: 'ga:pageviews' }],
          },
        ],
      },
    });
    const totalPageviews = res.data.reports[0].data.totals[0].values[0];
    return totalPageviews;
  } catch (error) {
    console.error('Error fetching total pageviews:', error);
    return null;
  }
}

// Usage
getTotalPageviews().then(totalPageviews => {
  console.log('Total Pageviews:', totalPageviews);
});
