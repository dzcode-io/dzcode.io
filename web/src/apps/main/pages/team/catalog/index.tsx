import { GetTeamResponseDto } from "@dzcode.io/api/dist/team/types";
import { Box } from "@dzcode.io/ui/dist/box";
import { ContributorCard, ContributorSkeleton } from "@dzcode.io/ui/dist/contributor-card";
import { Grid } from "@dzcode.io/ui/dist/grid";
import { Typography } from "@dzcode.io/ui/dist/typography";
import { FC } from "react";
import { T, t } from "src/apps/main/components/t";

interface CatalogProps {
  teamList: GetTeamResponseDto["contributors"] | null;
}

export const Catalog: FC<CatalogProps> = ({ teamList }) => {
  return (
    <Grid container alignItems="center" justifyContent="center" sx={{ my: 2 }} rowGap={4}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          <T team-title />
        </Typography>
      </Grid>
      {teamList
        ? teamList.map((contributor) => (
            <Grid key={`contributor-${contributor.id}`} item xs={12} sm={6} md={4} lg={3}>
              <Box display="flex" justifyContent="center">
                <ContributorCard
                  contributor={contributor}
                  ctaText={t("team-card-cta-button")}
                  repositoriesText={t("team-card-repositories")}
                />
              </Box>
            </Grid>
          ))
        : [1, 2, 3, 4].map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Box display="flex" justifyContent="center">
                <ContributorSkeleton />
              </Box>
            </Grid>
          ))}
    </Grid>
  );
};
