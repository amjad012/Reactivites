import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Item,
  ItemContent,
  Label,
  Segment,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import React from "react";
import { format } from "date-fns";
import ActivityListItemAttendee from "./ActivityListItemAttendee";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";
interface Props {
  activity: Activity;
}

export default observer(function ActivityListItem({ activity }: Props) {
  return (
    <Segment.Group>
      <Segment>
        {activity.isCancelled && (
          <Label
            attached="top"
            color="red"
            content="Cancelled"
            style={{ textAlign: "center" }}
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
              <Item.Content>
                <Item.Header as={Link} to={`/activities/${activity.id}`}>
                  {activity.title}
                </Item.Header>
                <Item.Description>
                  Hosted by{" "}
                  <Link to={`/profiles/${activity.hostUsername}`}>
                    {activity.hostUsername}
                  </Link>
                </Item.Description>
                {activity.isHost && (
                  <Item.Description>
                    <Label basic color="orange">
                      You are hosting this activity
                    </Label>
                  </Item.Description>
                )}
                {activity.isGoing && !activity.isHost && (
                  <Item.Description>
                    <Label basic color="green">
                      You are going to this activity
                    </Label>
                  </Item.Description>
                )}
              </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(activity.date!, "dd MMM yyyy h:mm aa")}
          {/* <Icon name='marker' /> {format(activity.date, 'dd MMM yyyy h:mm aa')} */}
        </span>
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendee attendees={activity.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="red"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
});
