import { makeStyles, useTheme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Line } from "@reactchartjs/react-chart.js";
import { LinkV2 } from "src/components/link-v2";
import MuiCard from "@material-ui/core/Card";
import { Project } from "t9/types/fullstack";
import React from "react";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    textAlign: "center",
  },
  media: {
    height: 300,
  },
  link: {
    color: theme.palette.primary.dark,
  },
}));

export const Card = ({
  image,
  title,
  description,
  githubURI,
  slug,
  graphData,
}: Project) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <MuiCard>
      <CardMedia className={classes.media} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      {graphData && (
        <CardContent>
          <Line
            height={50}
            data={{
              labels: graphData.xAxe,
              datasets: [
                {
                  data: graphData.yAxe,
                  lineTension: 0,
                  borderColor: theme.palette.primary.main,
                },
              ],
            }}
            type="line"
            options={{
              elements: { point: { radius: 0 } },
              scales: {
                yAxes: [{ display: false }],
                xAxes: [{ display: false }],
              },
              legend: {
                display: false,
              },
            }}
          />
        </CardContent>
      )}
      <CardActions>
        {githubURI && (
          <Button
            size="small"
            color="primary"
            href={`https://github.com/${githubURI}`}
          >
            Github Repository
          </Button>
        )}
        {!githubURI && slug && (
          <Button size="small" color="primary">
            <LinkV2 href={`/Articles/${slug}`} className={classes.link}>
              Read Article
            </LinkV2>
          </Button>
        )}
      </CardActions>
    </MuiCard>
  );
};
