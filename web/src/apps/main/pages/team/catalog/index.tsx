import { FC, useState } from "react";
import Button from "@material-ui/core/Button";
import { Card } from "src/apps/main/components/card";
import { GithubUser } from "@dzcode.io/common/dist/types";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { SimpleDialog } from "src/apps/main/components/dialog";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(4),
  },
  header: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    textAlign: "center",
  },
}));

interface CatalogProps {
  contributorsList:
    | { login: string; avatar_url: string; projects: string[] }[]
    | null;
}

export const Catalog: FC<CatalogProps> = ({ contributorsList }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Typography variant="h4" className={classes.header}>
        Our Team
      </Typography>
      <Grid container className={classes.root} spacing={4}>
        {contributorsList
          ? contributorsList.map(
              (contributor: {
                login: string;
                avatar_url: string;
                projects: string[];
              }) => (
                <Grid
                  key={`project-${contributor.login}`}
                  item
                  xs={12}
                  md={6}
                  lg={4}
                >
                  <Card
                    info={{
                      image: contributor.avatar_url || "",
                      title: contributor.login || "",
                      description: "",
                      button: (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleClick}
                        >
                          Contributions
                        </Button>
                      ),
                    }}
                  />
                  <SimpleDialog
                    projects={contributor.projects}
                    open={open}
                    onClose={handleClick}
                  />
                </Grid>
              ),
            )
          : [1, 2, 3].map((id) => (
              <Grid key={`project-${id}`} item>
                <Card />
              </Grid>
            ))}
      </Grid>
    </>
  );
};

Catalog.propTypes = {
  contributorsList: PropTypes.array.isRequired,
};
