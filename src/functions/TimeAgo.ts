export default function TimeAgo(date) {
  let momentAgo = "";
  try {
    let currentDate = new Date();
    let dateAgo = new Date(date);
    let years = currentDate.getFullYear() - dateAgo.getFullYear();
    let months = currentDate.getMonth() - dateAgo.getMonth();
    let days = currentDate.getDay() - dateAgo.getDay();
    let hours = currentDate.getHours() - dateAgo.getHours();
    let minutes = currentDate.getMinutes() - dateAgo.getMinutes();
    let seconds = currentDate.getSeconds() - dateAgo.getSeconds();

    if (dateAgo > currentDate)
      momentAgo = "Date error";
    else {
      if (years > 0)
      momentAgo = years + " years ago";
      else if (months > 0)
      momentAgo = months + " months ago";
      else if (days > 0)
      momentAgo = days + " days ago";
      else if (days < 0)
      momentAgo = "about a month ago";
      else if (hours > 0)
      momentAgo = hours + " hours ago";
      else if (minutes > 0)
      momentAgo = minutes + " minutes ago";
      else if (seconds > 0)
      momentAgo = seconds + " seconds ago";
    }
    return momentAgo;
  } catch (error) {
    console.log(error.message);
  }
  return
}
