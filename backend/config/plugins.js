module.exports = ({ env }) => ({
    "vercel-deploy": {
      enabled: true,
      config: {
        deployHook:
          "https://api.vercel.com/v1/integrations/deploy/prj_FbE66qp2jSKkF7PwTuXJ1d9UPdcx/AFHrQq4OiU",
        apiToken: "c2tgA1VyfHX2mGFVmvPxQ0kT",
        appFilter: "your-app-name-on-vercel",
        teamFilter: "team_mFzgmRNF0f6Sfi9a3654jjL3",
        roles: ["strapi-super-admin", "strapi-editor", "strapi-author"],
      },
    },
  });