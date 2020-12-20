import React from 'react';
import { Feed, Header, Icon, Label } from 'semantic-ui-react';

import './SocialFeed.css';
import Loader from '../Loader/Loader';
import { isNullOrUndefined } from  '../../util/common';

function SocialFeed(props) {
  const { tweets } = props;
  if (isNullOrUndefined(tweets))
  {
    return (<Loader></Loader>)
  }
  return (
    <div className="news-container">
      <Header as='h3'>Feed</Header>
      <Feed>
        {tweets.length === 0 && <div>Nothing found.</div>}
        {tweets.map((start) => {
          return (
          <Feed.Event key={start.id}>
            <Feed.Label>
              <Icon name="twitter"></Icon>
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User>{start.user.name} (@{start.user.screen_name})</Feed.User>
                <Feed.Date>{start.created_at}</Feed.Date>
              </Feed.Summary>
              <Feed.Extra>
                {start.full_text}
              </Feed.Extra>
              <Feed.Meta>
                {start.entities.hashtags.map((hashtag) => {
                  return (
                    <Label key={`${start.user.id}${hashtag.text}`}>
                      {hashtag.text}
                    </Label>
                  )
                })}
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>);
        })}
      </Feed>
    </div>);

}

export default SocialFeed;