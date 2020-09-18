export default function (req, res, next) {
  if (req.url === "/health") {
    res.end("I'm okey!!!")
  } else {
    next()
  }
}
