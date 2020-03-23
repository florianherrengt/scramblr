import React from 'react';

import { TagsListContainer } from './TagsListContainer';
import { CreateTagContainer } from './CreateTagContainer';
import { LineSpacer } from '../../components';

interface TagsPageProps {}

export const TagsPage: React.SFC<TagsPageProps> = props => {
  return (
    <div>
      <LineSpacer />
      <CreateTagContainer />
      <LineSpacer />
      <TagsListContainer />
    </div>
  );
};
