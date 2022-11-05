import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import SendEmail from "../../components/account/verifyEmail/sendEmail";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const VerifyEmail: NextPage = () => {
  

  return (
    <div className="flex min-h-screen items-center justify-center py-32">
      <SendEmail />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);

  return {
    props: { session },
  };
};

export default VerifyEmail;
