import { Fragment, useContext } from 'react';
import Notification from '../ui/notification';
import NotificationContext from '../../context/notification-context';
import MainHeader from './main-header';

function Layout(props) {
  const ctx = useContext(NotificationContext);
  const activeNotification = ctx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
