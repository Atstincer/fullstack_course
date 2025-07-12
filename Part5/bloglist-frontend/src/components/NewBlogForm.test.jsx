import { render, screen } from "@testing-library/react";
import NewBlogForm from "./NewBlogForm";
import userEvent from "@testing-library/user-event";

test("Onsubmit gets call OK on NewBlogForm", async () => {
  const addNewBlog = vi.fn();
  const user = userEvent.setup();

  render(<NewBlogForm addNewBlog={addNewBlog} />);
  const btnSubmitForm = screen.getByText("create");
  const titleInput = screen.getByPlaceholderText("writte yor title hear");
  const authorInput = screen.getByPlaceholderText("writte the author hear");
  const urlInput = screen.getByPlaceholderText("writte the url hear");

  await user.type(titleInput, "My blog of hausemade Kuchen");
  await user.type(authorInput, "Julio");
  await user.type(urlInput, "http://kkkk");

  await user.click(btnSubmitForm);

  //console.log(addNewBlog.mock.calls)

  expect(addNewBlog.mock.calls).toHaveLength(1);
  expect(addNewBlog.mock.calls[0][0].title).toBe("My blog of hausemade Kuchen");
  expect(addNewBlog.mock.calls[0][0].author).toBe("Julio");
  expect(addNewBlog.mock.calls[0][0].url).toBe("http://kkkk");
});
