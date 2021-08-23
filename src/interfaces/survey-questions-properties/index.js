import { defineInterface } from '@/interfaces/define';
import SurveyQuestionsProperties from './survey-questions-properties.vue';

export default defineInterface({
  id: 'survey-questions-properties',
  name: '$t:interfaces.survey-questions-properties.survey-questions-properties',
  description: '$t:interfaces.survey-questions-properties.description',
  icon: 'replay',
  component: SurveyQuestionsProperties,
  types: ['json'],
});
