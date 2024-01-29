import SwrProvider from '@/components/provider/swr-provider';
import TeamSettingContainerView from './teamsetting-container';

const TeamSettingContainer = () => {
  return (
    <SwrProvider>
      <TeamSettingContainerView />
    </SwrProvider>
  );
};

export default TeamSettingContainer;
