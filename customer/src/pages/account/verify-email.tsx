import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const VerifyEmail: NextPage = () => {
  return <div className="pt-32">Verify</div>;
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
