import { Box } from "@dzcode.io/ui/dist/box";
import { ContributorCard, ContributorSkeleton } from "@dzcode.io/ui/dist/contributor-card";
import { Grid } from "@dzcode.io/ui/dist/grid";
import { Typography } from "@dzcode.io/ui/dist/typography";
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { TeamPageState } from "src/apps/main/redux/reducers/team-page";

interface CatalogProps {
  teamList: TeamPageState["teamList"];
}

export const Catalog: FC<CatalogProps> = ({ teamList }) => {
  return (
    <Grid container alignItems="center" justifyContent="center" sx={{ my: 2 }} rowGap={4}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          <FormattedMessage
            id="faq.teampage.header"
            defaultMessage="Say Hi to Our Contributors 💻"
          />
        </Typography>
      </Grid>
      {teamList
        ? teamList.map((contributor) => (
            <Grid key={`contributor-${contributor.id}`} item xs={12} sm={6} md={4} lg={3}>
              <Box display="flex" justifyContent="center">
                <ContributorCard contributor={contributor} />
              </Box>
            </Grid>
          ))
        : [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Box display="flex" justifyContent="center">
                <ContributorSkeleton />
              </Box>
            </Grid>
          ))}
    </Grid>
  );
};
