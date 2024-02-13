import {useRecoilValue} from 'recoil';
import CreateIssueView from './create-issue';
import {UserState} from '@/src/app';

interface PropsType {}

const CreateIssue = ({}: PropsType) => {
  const {email} = useRecoilValue(UserState);

  return <CreateIssueView />;
};

export default CreateIssue;
