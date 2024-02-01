import { auth } from "@/src/config/firebaseConfig";
import { SocialType } from "@/src/type/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  OAuthProvider,
} from "firebase/auth";

export const firebaseLogin = async (type: SocialType) => {
  switch (type) {
    case "GOOGLE":
      const googleProvider = new GoogleAuthProvider();
      const {
        user: { uid: googleUid },
      } = await signInWithPopup(auth, googleProvider);

      return googleUid;

    case "GITHUB":
      const githubProvider = new GithubAuthProvider();
      const {
        user: { uid: githubUid },
      } = await signInWithPopup(auth, githubProvider);

      return githubUid;

    case "MICROSOFT":
      const msProvider = new OAuthProvider("microsoft.com");
      try {
        const {
          user: { uid: msUid },
        } = await signInWithPopup(auth, msProvider);
        return msUid;
      } catch (err) {
        alert("이미 가입된 유저 입니다.");
      }
      break;
    default:
      break;
  }
};
