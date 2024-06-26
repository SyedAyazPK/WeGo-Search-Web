import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VendorPriceQuote from "../forms/VendorPriceQuote";

export default function UserProfileCard({ profile, socket, service }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="user"
        // height="140"
        image={profile?.profileImage}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="text-center font-bold"
        >
          <u>
            <b>{profile?.name}</b>
          </u>
        </Typography>

        <VendorPriceQuote profile={profile} socket={socket} service={service} />
      </CardContent>
    </Card>
  );
}
