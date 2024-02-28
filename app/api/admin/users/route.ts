export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const { searchParams } = url;

    // Infinite query params
    const page = searchParams.get("page")!;
    const limit = searchParams.get("limit")!;

    // Search query params
    const sortBy = searchParams.get("sortBy");
  } catch (error) {}
}
