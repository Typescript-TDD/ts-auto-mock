module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-37077972-4",
        head: false
      },
    }
  ]
};
