import { CreateComment } from "@/features/comments/actions";

type Props = {
  params: {
    id: string;
  };
  searchParams: object;
};
const EpisodeShowPage = (props: Props) => {
  const { params } = props;
  const { id } = params;

  return (
    <>
      <div>エピソードの詳細ページです</div>
      <form method="POST" action={CreateComment}>
        <input hidden value="8167baf4-b514-4f8e-9a43-d81bf9a8a305" name="userId" />
        <input hidden value={id} name="episodeId" />
        <input type="input" name="description"></input>
        <button>投稿</button>
      </form>
    </>
  );
};

export default EpisodeShowPage;
