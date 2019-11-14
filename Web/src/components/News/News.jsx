import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Feed, Label } from 'semantic-ui-react';

import * as appActions from '../../actions/appActions';
import './News.css';
import Loader from '../Loader/Loader';

class News extends Component {

    constructor(props) {
        super(props)

        this.props.getNews()
    }

    render() {
        const { news, teams } = this.props;
        if (!news) {
            return (<div><Loader></Loader></div>)
        }
        const { sources } = news;
        return (
            <div className="news-container">
                        <Feed>
                        {news.news.map((start)=>{
                            var team = teams.filter((team)=>{
                                return team.id === start.source.team
                            })[0];
                            var source = sources.filter((source)=>{
                                return source.id === start.source.id
                            })[0];
                            return (<Feed.Event>
                                <Feed.Label>
                                    <Image avatar src={team.logo} />
                                </Feed.Label>
                                <Feed.Content>
                                    <Feed.Summary>
                                        <Feed.User>{source.name} (@{source.id})</Feed.User>
                                        <Feed.Date>{start.created_at}</Feed.Date>
                                    </Feed.Summary>
                                    <Feed.Extra>
                                        {start.text}
                                    </Feed.Extra>
                                    <Feed.Meta>
                                        {start.names.map((name)=>{
                                            return (
                                                <Label>
                                                    {name}
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
}

const mapStateToProps = state => ({
    news: state.app.news,
    teams: state.app.teams,
})

const mapDispatchToProps = dispatch => ({
    getNews: () => dispatch(appActions.getNews())
})

export default connect(mapStateToProps, mapDispatchToProps)(News);