import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrivacyPolicy } from "@/components/PrivacyPolicy/PrivacyPolicy";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home_page");

  return (
    <main>
      <PrivacyPolicy
        bodyNode={
          <>
            The Department’s Bureau of Global Public Affairs (GPA) uses the
            GovDelivery service to deliver email bulletin messages to
            self-subscribed users. GPA’s Office of Global Web Platforms serves
            as the executive agent for the Department’s GovDelivery Service and
            controls who at the Department has access to send email bulletins,
            create or delete topics. GovDelivery is a web-based e-mail
            subscription management system that allows a member of the public
            (user) to subscribe to news and information on www.state.gov. The
            GovDelivery user selects specific topics that interest them.
            Whenever information on that topic is made available by the
            Department, the user that has subscribed to that topic receives an
            email. The user’s subscription profile consists of their email
            address and the topics they wish to receive email updates for. The
            user may customize and manage their subscription profile in order to
            receive exactly the types of information they desire, and they may
            cancel their subscriptions at any time. Users engaging the
            Department’s GovDelivery system expect privacy protections while
            interacting with the Department. We will only use the email
            addresses provided by the users to send email messages related to
            the topics selected by the user in the GovDelivery system. We will
            not use the GovDelivery service to: 1) send email messages not
            related to the topics selected by the user; 2) actively seek
            personally identifiable information; and 3) search for or by
            personally identifiable information without a waiver from our
            Privacy Office. To the extent a user posts or sends personally
            identifiable information to the Department’s GovDelivery system, we
            will use the minimum amount necessary to accomplish a purpose
            authorized by statute, executive order, or regulation. Neither the
            Department nor GovDelivery may share a user’s subscription profile
            (including email address) without a waiver from the Privacy Office.
          </>
        }
      />
    </main>
  );

  // return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home_page");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
