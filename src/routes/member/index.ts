import { Router } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import MemberModel from "../../database/models/TodoModel";

const MemberRouter = Router();

let members = [{
    id:1, 
    firstName: "Adam",
    userId: 10
},{
    id:2, 
    firstName: "Alan",
    userId: 20
}]

// GET REQUESTS
// /v1/member/byid
MemberRouter.get("/byid", (req, res) => {
  const memberId = parseInt(req.query.memberId as string);
  if (!memberId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  res.status(StatusCodes.OK).send("Get member by id");
});

// /v1/member/bymemberid
MemberRouter.post("/bymemberid", (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
        return;
      }
  res.status(StatusCodes.OK).send("Get member by user id");
});

//GET return all members
// /v1/member/members
MemberRouter.get('/members',(req,res) => {
    res.status(StatusCodes.OK).json({members});
})

// PUT REQUESTS
// /v1/member/mark
MemberRouter.put("/mark", (req, res) => {
  res.status(StatusCodes.OK).send("member als erledeigt markieren");
});
MemberRouter.put("/update", (req, res) => {
  res.status(StatusCodes.OK).send("member aktuallisieren");
});

export default MemberRouter;