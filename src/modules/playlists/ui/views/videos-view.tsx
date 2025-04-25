interface VideosViewProps {
  playlistId: string;
}

export const VideosView = ({ playlistId }: VideosViewProps) => {
  return (
    <div className="max-w-screen-md mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      {/* TODO: <PlaylistHeaderSection playlistId={playlistId} /> */}

      {/* TODO: <VideosSection /> */}
    </div>
  );
};
