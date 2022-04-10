export interface SolidProfile {
  webId: string;
  avatar: string | null;
  name: string | null;
  nickname: string | null;
  inbox: string | null;
  preferencesFile: string | null;
  pods: string[];
}
