import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const ResDMbio = (dm) => {
  return (
    <Card raised="true" sx={{ maxWidth: 500 }}>
      <CardContent>
        <div alignItems="center" className="resDMbioCard">
          <div className="name">
            <Typography
              variant="h4"
              color="text.primary"
              sx={{ mb: 1, textAlign: "center" }}
            >
              {dm.name}
            </Typography>
          </div>
          <img src={dm.image} alt={dm.name} className="image" />
          <div className="location">
            <Divider variant="middle" sx={{ my: 0.8 }} />
            <Typography variant="subtitle2" color="text.secondary">
              <strong>L:</strong> {dm.location}
            </Typography>
            <Divider variant="middle" sx={{ my: 0.8 }} />
          </div>
          <div className="superpowers">
            <Typography variant="subtitle2" color="text.secondary">
              <strong>Known for:</strong> {dm.superpowers}
            </Typography>
            <Divider variant="middle" sx={{ my: 0.8 }} />
          </div>
          <div className="favMonster">
            <Typography variant="subtitle2" color="text.secondary">
              <strong>Favourite Monster:</strong> {dm.favMonster}
            </Typography>
          </div>
          <div className="favMoment">
            <Divider variant="middle" sx={{ my: 0.8 }} />
            <Typography variant="subtitle2" color="text.secondary">
              <strong>Favourite Moment:</strong> {dm.favMoment}
            </Typography>
            <Divider variant="middle" sx={{ my: 0.8 }} />
          </div>
          <div className="otherInterests">
            <Typography variant="subtitle2" color="text.secondary">
              <strong>Other Interests:</strong> {dm.otherInterests}
            </Typography>
          </div>
          <div className="links">
            {dm.link1 && (
              <React.Fragment>
                <Divider variant="middle" sx={{ my: 0.8 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  <Grid
                    container
                    spacing={1}
                    direction="column"
                    alignItems="center"
                    sx={{ pt: 1 }}
                  >
                    <a href="{dm.link1}" target="_blank" rel="noreferrer">
                      {dm.link1name}
                    </a>
                    <a href="{dm.link2}" target="_blank" rel="noreferrer">
                      {dm.link2name}
                    </a>
                  </Grid>
                </Typography>
              </React.Fragment>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResDMbio;
