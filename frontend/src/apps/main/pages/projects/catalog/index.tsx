import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { Project } from "t9/types/fullstack";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingBottom: theme.spacing(4),
    },
    header: {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(6),
      textAlign: "center",
    },
    cardRoot: {},
    media: {
      height: 300,
    },
  }),
);

export const Catalog = (props: { projectsList: Project[] | null }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h2" component="h1" className={classes.header}>
        Open Source Projects
      </Typography>
      <Grid container className={classes.root} spacing={4}>
        {props.projectsList
          ? props.projectsList.map((project) => (
              <Grid
                key={`project-${project.slug}`}
                alignItems="center"
                alignContent="center"
                item
                xs={12}
                md={6}
                lg={4}
              >
                <Card className={classes.cardRoot}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={project.image}
                      title={project.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {project.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      href={`https://github.com/${project.githubURI}`}
                    >
                      Github Repository
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          : [1, 2, 3].map((id) => (
              <Grid key={`project-${id}`} item>
                <Card className={classes.cardRoot}>
                  <CardActionArea>
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      className={classes.media}
                    />
                    <CardContent>
                      <>
                        <Skeleton
                          animation="wave"
                          height={10}
                          style={{ marginBottom: 6 }}
                        />
                        <Skeleton animation="wave" height={10} width="80%" />
                      </>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
      </Grid>
    </>
  );
};
