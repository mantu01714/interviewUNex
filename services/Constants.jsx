import { BriefcaseBusinessIcon, Calendar, Code2Icon, GroupIcon, LayoutDashboard, List, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";
export const SideBarOptions=[

    {
        name:'Dashboard',
        icon:LayoutDashboard,
        path:'/dashboard'
    },
    {
        name:'Scheduled Interview',
        icon:Calendar,
        path:'/scheduled-interview'
    },
    {
        name:'All Interview',
        icon:List,
        path:'/all-interview'
    },
    {
        name:'Billing',
        icon:WalletCards,
        path:'/billing'
    },
    {
        name:'Settings',
        icon:Settings,
        path:'/settings'
    },

]

export const InterviewType = [
    {
        title: 'Technical',
        icon: Code2Icon
    },
    {
        title: 'Behavioral',
        icon: User2Icon
    },
    {
        title: 'Experience',
        icon: BriefcaseBusinessIcon
    },
    {
        title: 'Problem Solving',
        icon: Puzzle
    },
    {
        title: 'Leadership',
        icon: GroupIcon
    },
]

export const PricingPlan = [
    {
        link: 'https://buy.stripe.com/test_14AeVfb7r2uaeAV8aA6sw03',
        price: 200.00,
        priceId: 'price_1RTjVIQ6mzsMDGrDr7GbwFAa',
        credits: 8,
        plan: 'Monthly Plan'
    },
    {
        link: 'https://buy.stripe.com/test_00w4gB1wRgl0gJ3gH66sw04',
        price: 700.00,
        priceId: 'price_1RTjmoQ6mzsMDGrDuwnp9t3a',
        credits: 35,
        plan: '3 Months Plan'
    },
    {
        link: 'https://buy.stripe.com/test_cNi28ta3n8Sy78tduU6sw02',
        price: 2500.00,
        priceId: 'price_1RTjOeQ6mzsMDGrDPowuWVlc',
        credits: 100,
        plan: 'Yearly Plan'
    }
]

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.
Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
question:",
type: '{{type}}'
}, {
...
}]

The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`



export const FEEDBACK_PROMPT = `
{{conversation}}

Based on this interview conversation between assistant and user, generate structured feedback. 
Return ONLY a valid JSON object (no text, no markdown, no explanation outside JSON). 

Follow this schema exactly:

{
  "feedback": {
    "rating": {
      "technicalSkills": "<number 1-10>",
      "communication": "<number 1-10>",
      "problemSolving": "<number 1-10>",
      "experience": "<number 1-10>",
      "totalRating": "<integer 1-10>"
    },
    "summary": "<3 short lines about the interview>",
    "Recommendation": "<Yes or No>",
    "RecommendationMsg": "<short reason why candidate is recommended or not>"
  }
}
`;
