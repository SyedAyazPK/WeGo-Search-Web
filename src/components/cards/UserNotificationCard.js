import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VendorPriceQuote from "../forms/VendorPriceQuote";

export default function UserNotificationCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="user"
        height="140"
        image="/userprofile.png"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="text-center font-bold"
        >
          <u>
            <b>User</b>
          </u>
        </Typography>

        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className=" font-bold mt-8"
        >
          <b>Description:</b>
        </Typography>
        <Typography gutterBottom component="div" className=" font-bold">
          lorem ipsum lorem ipsim lorem ipsum lorem ipsim lorem ipsum lorem
          ipsim lorem ipsum lorem ipsim lorem ipsum lor em ipsim
        </Typography>
      </CardContent>
    </Card>
  );
}
