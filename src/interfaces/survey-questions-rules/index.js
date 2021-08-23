import { defineInterface } from '@/interfaces/define';
import SurveyQuestionsRules from './survey-questions-rules.vue';

export default defineInterface({
  id: 'survey-questions-rules',
  name: '$t:interfaces.survey-questions-rules.survey-questions-rules',
  description: '$t:interfaces.survey-questions-rules.description',
  icon: 'replay',
  component: SurveyQuestionsRules,
  types: ['json'],
});
