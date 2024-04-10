import BookListResponse from "@/types/api/book-list-response";

interface BookEntities {
  data: BookListResponse;
  error: string | null | undefined;
}
