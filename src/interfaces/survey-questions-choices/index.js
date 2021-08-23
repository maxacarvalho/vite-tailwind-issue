import { defineInterface } from '@/interfaces/define';
import RepeaterOptions from './options.vue';
import InterfaceList from './list.vue';

export default defineInterface({
	id: 'survey-questions-choices',
	name: '$t:interfaces.survey-questions-choices.repeater',
	description: '$t:interfaces.survey-questions-choices.description',
	icon: 'replay',
	component: InterfaceList,
	types: ['json'],
	options: RepeaterOptions,
});
