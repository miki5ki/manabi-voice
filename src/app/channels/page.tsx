import Link from "next/link";

import { getChannels } from "@/features/channels/actions";

const ChannelsPage = async () => {
  const channels = await getChannels();

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>詳細</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {channels?.map((channel) => (
            <>
              <tr key={channel.id}>
                <td>{channel.title}</td>
                <td>{channel.description}</td>
                <td>
                  <Link href={`/channels/${channel.id}/edit`}>編集</Link>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ChannelsPage;
