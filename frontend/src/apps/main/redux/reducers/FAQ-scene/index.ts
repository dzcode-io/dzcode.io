import { actionType } from "t9/apps/main/redux/constants";

const INITIAL_STATE = {
  faqData: [
    {
      question: "Are there different types of certificates ?",
      answer:
        "Yes. There will be a Certificate of Participation (CoP) and a Certificate of Completion (CoC).",
    },
    {
      question:
        "What are the eligibility types for different certificate types ?",
      answer:
        "To receive a CoP, you must successfully complete Milestone 1 of your track within 3 months of enrollment; however, the content itself needs no longer than 2 weeks to complete. To receive a CoC, you must successfully complete Milestone 2 of your track within 6 months of enrollment; however, the content itself needs no longer than 3 months to complete. Details on how to complete these Milestones are available in your classroom.",
    },
    {
      question: "What are the criteria to be selected for the ND phase ?",
      answer:
        "Students who complete the full foundational track (Milestone 1+2) within 6 months are eligible to take the final assessment in their corresponding track. Final assessments take place every 3 months. Accordingly, top scoring students of the final assessment (around 0.01% of all students enrolled) who show promise and potential will then be selected to take the Nanodegree.",
    },
    {
      question:
        "Is there any kind of support provided to students during the program?",
      answer:
        "Throughout your journey, you will have access to the 1MAC community forum to ask other students and tutors questions to help you through any learning difficulties. For inquiries related to the content you can also reach out to our support team at 1marabcoders@udacity.com For inquiries related to the initiative or program at large please reach out.",
    },
    {
      question: "How can I be eligible to access the final assessment?",
      answer:
        "You must complete both Milestone 1 and 2 of your track within 6 months of the first day of enrollment to be eligible for the final assessment.",
    },
    {
      question: "What do you mean by milestone?",
      answer:
        "A Milestone is a stage in a student's learning journey in his/her track where he/she is tested for the practical knowledge they have attained from the classroom content using auto graded tests.",
    },
    {
      question: "How to join the program as a student/tutor?",
      answer:
        "Students do not need to apply; they simply need to enroll themselves in the track of their choice through this link. Individuals interested in becoming tutors, should apply, ready to show that they have expert knowledge in the track they are applying to as tutors - more details on tutor application will be shared soon.",
    },
    {
      question:
        "Can students re-enroll in the same track after finishing it and receiving a certificate?",
      answer:
        "Yes but individuals will only receive 1 certificate per track per milestone regardless of the number of times they enroll.",
    },
    {
      question:
        "Will the certificates be accredited? and will it have a unique code or serial number ?",
      answer:
        "Udacity is a private online education provider that is not accredited by an official institution. However, the One Million Arab Coders Milestone certificate will be signed by the UAE's Minister of Artificial Intelligence and our founder Sebastian Thrun and will contain a unique code that can be later verified for every individual.",
    },
    {
      question: "Until when is the initiative available ?",
      answer: "The initiative is ongoing on a rolling basis.",
    },
  ],
};

const FaqScene = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default FaqScene;
