interface IEnvfyProtocolState {
  envfyTeams: number;
  eventsCompleted: number;
  pooledFunds: number;
  lifetimePooledFunds: number;
}

interface IUserPost {
  type: "video" | "image" | "text";
  mediaCid: string[];
  caption?: string;
  donation: number;
  location: {
    country: string;
    city: string;
  };
  createdAt: number;
}

interface ICreateTeamReq {
  teamName: string;
  teamDescription: string;
  membersCount: number;
  adminsDid?: string[];
  moderatorsDid?: string[];
}

interface IEnvfyTeam {
  teamDid: string;
  teamName: string;
  teamDescription: string;
  membersCount: number;
  adminsDid?: string[];
  moderatorsDid?: string[];
  posts?: {
    type: string;
    posterDid: string;
    postDid: string;
    postTitle?: string;
    postSummary?: string;
    createdAt: number;
  }[];
  createdAt: number;
}

interface IEnvfyTeams {
  data: {
    teamDid: string;
    teamName: string;
    membersCount: number;
    createdAt: number;
  }[];
}

interface ICreateTeamPostReq {
  type: "video" | "image" | "text";
  teamDid: string;
  posterDid: string;
  allowComments: boolean;
  postTitle: string;
  mediaCid?: string[];
  body?: string;
}

interface IEnvfyTeamPost {
  type: "video" | "image" | "text";
  teamDid: string;
  postDid: string;
  posterDid: string;
  allowComments: boolean;
  postTitle: string;
  mediaCid?: string[];
  body?: string;
  comments?: {
    commenterDid: string;
    comment: string;
    createdAt: number;
  }[];
  createdAt: number;
}

interface ICreatePostCommentReq {
  postDid: string;
  commenterDid: string;
  comment: string;
}
