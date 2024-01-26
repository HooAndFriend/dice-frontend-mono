import SwrProvider from '@/components/provider/swr-provider';
import UserSettingContainerView from './usersetting-container';

const UserSettingContainer = () => {
  return (
    <SwrProvider>
      <UserSettingContainerView />
    </SwrProvider>
  );
};

export default UserSettingContainer;
