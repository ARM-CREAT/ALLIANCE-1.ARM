
import { NewsItem, JoinRequest, Member, ProgramPoint, MediaItem, ChatMessage, Poll } from '../types';
import { DEFAULT_NEWS, LEADERSHIP, PROGRAM, DEFAULT_MEDIA, DEFAULT_POLLS } from '../constants';

const NEWS_KEY = 'arm_news';
const REQUESTS_KEY = 'arm_join_requests';
const MEMBERS_KEY = 'arm_members';
const PROGRAM_KEY = 'arm_program';
const MEDIA_KEY = 'arm_media';
const CHAT_KEY = 'arm_chat_messages';
const AUTH_KEY = 'arm_is_admin';
const POLLS_KEY = 'arm_polls';

export const StorageService = {
  // News
  getNews: (): NewsItem[] => {
    const stored = localStorage.getItem(NEWS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_NEWS;
  },

  addNews: (news: NewsItem) => {
    const current = StorageService.getNews();
    const updated = [news, ...current];
    localStorage.setItem(NEWS_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteNews: (id: string) => {
    const current = StorageService.getNews();
    const updated = current.filter(n => n.id !== id);
    localStorage.setItem(NEWS_KEY, JSON.stringify(updated));
    return updated;
  },

  // Members (Bureau)
  getMembers: (): Member[] => {
    const stored = localStorage.getItem(MEMBERS_KEY);
    return stored ? JSON.parse(stored) : LEADERSHIP;
  },

  saveMembers: (members: Member[]) => {
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
  },

  addMember: (member: Member) => {
    const current = StorageService.getMembers();
    const updated = [...current, member];
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteMember: (id: string) => {
    const current = StorageService.getMembers();
    const updated = current.filter(m => m.id !== id);
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(updated));
    return updated;
  },

  // Program
  getProgram: (): ProgramPoint[] => {
    const stored = localStorage.getItem(PROGRAM_KEY);
    return stored ? JSON.parse(stored) : PROGRAM;
  },

  addProgramPoint: (point: ProgramPoint) => {
    const current = StorageService.getProgram();
    const updated = [...current, point];
    localStorage.setItem(PROGRAM_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteProgramPoint: (title: string) => {
    const current = StorageService.getProgram();
    const updated = current.filter(p => p.title !== title);
    localStorage.setItem(PROGRAM_KEY, JSON.stringify(updated));
    return updated;
  },

  // Media / Gallery
  getMedia: (): MediaItem[] => {
    const stored = localStorage.getItem(MEDIA_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_MEDIA;
  },

  addMedia: (item: MediaItem) => {
    const current = StorageService.getMedia();
    const updated = [item, ...current];
    localStorage.setItem(MEDIA_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteMedia: (id: string) => {
    const current = StorageService.getMedia();
    const updated = current.filter(m => m.id !== id);
    localStorage.setItem(MEDIA_KEY, JSON.stringify(updated));
    return updated;
  },

  // Chat
  getChatMessages: (): ChatMessage[] => {
    const stored = localStorage.getItem(CHAT_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  addChatMessage: (msg: ChatMessage) => {
    const current = StorageService.getChatMessages();
    // Keep only last 100 messages
    const updated = [...current, msg].slice(-100);
    localStorage.setItem(CHAT_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteChatMessage: (id: string) => {
      const current = StorageService.getChatMessages();
      const updated = current.filter(m => m.id !== id);
      localStorage.setItem(CHAT_KEY, JSON.stringify(updated));
      return updated;
  },

  // Join Requests
  getJoinRequests: (): JoinRequest[] => {
    const stored = localStorage.getItem(REQUESTS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  addJoinRequest: (req: JoinRequest) => {
    const current = StorageService.getJoinRequests();
    const updated = [req, ...current];
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
  },

  // Polls
  getPolls: (): Poll[] => {
      const stored = localStorage.getItem(POLLS_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_POLLS;
  },

  addPoll: (poll: Poll) => {
      const current = StorageService.getPolls();
      // Deactivate others if needed, for now just push
      const updated = [poll, ...current];
      localStorage.setItem(POLLS_KEY, JSON.stringify(updated));
      return updated;
  },

  votePoll: (pollId: string, optionId: string) => {
      const current = StorageService.getPolls();
      const updated = current.map(poll => {
          if (poll.id === pollId) {
              return {
                  ...poll,
                  totalVotes: poll.totalVotes + 1,
                  options: poll.options.map(opt => 
                      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
                  )
              };
          }
          return poll;
      });
      localStorage.setItem(POLLS_KEY, JSON.stringify(updated));
      return updated;
  },

  deletePoll: (id: string) => {
      const current = StorageService.getPolls();
      const updated = current.filter(p => p.id !== id);
      localStorage.setItem(POLLS_KEY, JSON.stringify(updated));
      return updated;
  },

  hasVoted: (pollId: string): boolean => {
      return localStorage.getItem(`arm_voted_${pollId}`) === 'true';
  },

  markAsVoted: (pollId: string) => {
      localStorage.setItem(`arm_voted_${pollId}`, 'true');
  },

  // Auth
  isAdmin: (): boolean => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  },

  setAdmin: (status: boolean) => {
    localStorage.setItem(AUTH_KEY, status ? 'true' : 'false');
  }
};
