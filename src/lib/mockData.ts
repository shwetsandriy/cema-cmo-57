export const mockEvents = [
  {
    id: 1,
    title: "Team Meeting",
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 2)),
    color: "purple-500",
  },
  {
    id: 2,
    title: "Project Review",
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 1)),
    color: "teal-500",
  },
  {
    id: 3,
    title: "Client Presentation",
    start: new Date(new Date().setDate(new Date().getDate() + 2)),
    end: new Date(new Date().setDate(new Date().getDate() + 2)),
    color: "pink-500",
  },
  {
    id: 4,
    title: "Team Building",
    start: new Date(new Date().setDate(new Date().getDate() + 3)),
    end: new Date(new Date().setDate(new Date().getDate() + 3)),
    color: "purple-500",
  },
  {
    id: 5,
    title: "Sprint Planning",
    start: new Date(new Date().setDate(new Date().getDate() + 4)),
    end: new Date(new Date().setDate(new Date().getDate() + 4)),
    color: "teal-500",
  },
];