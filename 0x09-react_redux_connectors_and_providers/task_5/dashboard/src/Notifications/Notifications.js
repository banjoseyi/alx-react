import React, { Fragment }from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';
import closeIcon from '../assets/close-icon.png';
import { connect } from "react-redux";
import { fetchNotifications } from "../actions/notificationActionCreators";

class Notifications extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchNotifications();
	  }

	render() {
		const { displayDrawer, listNotifications, handleDisplayDrawer, handleHideDrawer, markNotificationAsRead } = this.props;
		const displayMenu = displayDrawer ? styles.noDisplay : styles.menuItem;
		return (
			<React.Fragment>
				<div id='menuItem' className={css(displayMenu)} onClick={handleDisplayDrawer}>
					Your notifications
				</div>
				{ displayDrawer &&
					<div className={css(styles.notifications)}>
						<button id='closeButton' style={{background: 'transparent', float: 'right'}} aria-label='Close' onClick={handleHideDrawer} >
							<img src={closeIcon} alt="close-icon" className={css(styles.notificationsButton)} />
						</button>
						<p>Here is the list of notifications</p>
						<ul className={css(styles.notificationsUl)}>
							{
								listNotifications.length === 0 &&
									(<NotificationItem
										value="No new notification for now"
									/>)
							}
							{
								listNotifications && Object.values(listNotifications).map((newNote) => (
									<NotificationItem
										key={newNote.guid}
										html={newNote.html}
										type={newNote.type}
										value={newNote.value}
										markAsRead={markNotificationAsRead}
										id={newNote.guid}
									/>
								))
							}
						</ul>
					</div>
				}
			</React.Fragment>
		);
	}
}

const responsive = {
	small: '@media screen and (max-width: 900px)'
};

const opacity = {
  from: {
    opacity: 0.5,
  },

  to: {
    opacity: 1,
  },
};

const translateY = {
  '0%': {
    transform: "translateY(0)",
  },

  '50%': {
    transform: "translateY(-5px)",
  },

  '75%': {
    transform: "translateY(5px)",
  },

  '100%': {
    transform: "translateY(0)",
  },
};

const styles = StyleSheet.create({
	menuItem: {
		fontFamily: 'Arial, Helvetica, sans-serif',
		textAlign: 'right',
		fontWeight: 'bold',
		padding: '5px',
		paddingRight: '20px',
		backgroundColor: '#fff8f8',
		display: 'block',
		":hover": {
			cursor: 'pointer',
			animationName: [opacity, translateY],
			animationDuration: '1s, 0.5s',
			animationIterationCount: 3
		}
	},

	noDisplay: {
		display: 'none'
	},

	notifications: {
		fontFamily: 'Arial, Helvetica, sans-serif',
		border: '2px dashed #e1354b',
		paddingRight: '20px 5px',
		margin: '5px',
		position: 'fixed',
		right: '1%',
		left: '65%',
		backgroundColor: 'white',
		zIndex: 1000,
		[responsive.small]: {
			display: 'block',
			background: 'white',
			fontSize: '20px',
			width: '100vw',
			height: '100vh',
			border: 'none',
			listStyle: 'none',
			padding: 0,
			margin: 0,
			top: 0,
			right: 0,
			left: 0,
		}
	},

	notificationsButton: {
		width: '20px',
		border: 'none',
		background: 'none',
		cursor: 'pointer'
	},

	notificationsUl: {
		paddingTop: '15px',
		paddingLeft: '40px',
		[responsive.small]: {
			padding: 0
		}
	}
});

Notifications.propTypes = {
	displayDrawer: PropTypes.bool,
	handleDisplayDrawer: PropTypes.func,
	handleHideDrawer: PropTypes.func,
	markNotificationAsRead: PropTypes.func,
	markNotificationAsRead: PropTypes.func,
};

Notifications.defaultProps = {
	displayDrawer: false,
	listNotifications: [],
	handleDisplayDrawer: () => {},
	handleHideDrawer: () => {},
	markNotificationAsRead: () => {},
	fetchNotifications: () => {},
};

const mapStateToProps = (state) => {
	return {
	  listNotifications: state.notifications.get("messages"),
	};
  };

  const mapDispatchToProps = {
	fetchNotifications,
  };

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
