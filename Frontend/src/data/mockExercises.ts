export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  targetIssue: string;
  thumbnail: string;
}

export const MOCK_EXERCISES: Record<string, Exercise[]> = {
  "Acne": [
    {
      id: "ex1",
      title: "Face Yoga for Clear Skin",
      description: "Gentle facial exercises to improve blood circulation and reduce acne inflammation",
      duration: "10 min",
      videoUrl: "https://www.youtube.com/embed/VEtysZXv0yk",
      targetIssue: "Acne",
      thumbnail: "https://img.youtube.com/vi/VEtysZXv0yk/maxresdefault.jpg"
    },
    {
      id: "ex2",
      title: "Lymphatic Drainage Massage",
      description: "Detoxifying facial massage to reduce inflammation and promote healing",
      duration: "8 min",
      videoUrl: "https://www.youtube.com/embed/bPx6gvUOnEA",
      targetIssue: "Acne",
      thumbnail: "https://img.youtube.com/vi/bPx6gvUOnEA/maxresdefault.jpg"
    }
  ],
  "Dry Skin": [
    {
      id: "ex3",
      title: "Hydrating Face Massage",
      description: "Massage techniques to boost moisture retention and circulation",
      duration: "12 min",
      videoUrl: "https://www.youtube.com/embed/qvEw58KvvjM",
      targetIssue: "Dry Skin",
      thumbnail: "https://img.youtube.com/vi/qvEw58KvvjM/maxresdefault.jpg"
    }
  ],
  "Oily Skin": [
    {
      id: "ex4",
      title: "Face Exercises for Oil Control",
      description: "Targeted exercises to regulate sebum production naturally",
      duration: "15 min",
      videoUrl: "https://www.youtube.com/embed/HrZCRP89t1A",
      targetIssue: "Oily Skin",
      thumbnail: "https://img.youtube.com/vi/HrZCRP89t1A/maxresdefault.jpg"
    }
  ],
  "Dark Spots": [
    {
      id: "ex5",
      title: "Brightening Face Massage",
      description: "Stimulate cell turnover and promote even skin tone",
      duration: "10 min",
      videoUrl: "https://www.youtube.com/embed/K1YpIRHw_nE",
      targetIssue: "Dark Spots",
      thumbnail: "https://img.youtube.com/vi/K1YpIRHw_nE/maxresdefault.jpg"
    }
  ],
  "Wrinkles": [
    {
      id: "ex6",
      title: "Anti-Aging Face Yoga",
      description: "Strengthen facial muscles to reduce fine lines and wrinkles",
      duration: "15 min",
      videoUrl: "https://www.youtube.com/embed/vXzeOH-xfKc",
      targetIssue: "Wrinkles",
      thumbnail: "https://img.youtube.com/vi/vXzeOH-xfKc/maxresdefault.jpg"
    },
    {
      id: "ex7",
      title: "Facial Toning Exercises",
      description: "Daily routine to lift and tone facial contours",
      duration: "12 min",
      videoUrl: "https://www.youtube.com/embed/eGn2FKJyHzI",
      targetIssue: "Wrinkles",
      thumbnail: "https://img.youtube.com/vi/eGn2FKJyHzI/maxresdefault.jpg"
    }
  ]
};
