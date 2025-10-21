import FriendRequest from "../model/getpeople.model.js"; // Fixed import name
import User from "../model/user.model.js";

export const getrecommend = async (req, res) => {
    try {
        const currentid = req.user._id;
        const currentuser = req.user;

        const recommenduser = await User.find({
            $and: [
                { _id: { $ne: currentid } },                 // exclude self
                { _id: { $nin: currentuser.friends } },      // exclude already-friends
                { isonboarded: true }                        // only onboarded users
            ]
        });

        res.status(200).json(recommenduser);
    } catch (error) {
        console.log(error);
        const msg = error.message;
        res.status(500).json({
            message: msg,
            success: false
        });
    }
}

export const getmyfriends = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select("friends")
            .populate("friends", "fullname bio nativelanguage learninglanguage location profilepic");
        
        res.status(200).json(user.friends);
    } catch (error) {
        const msg = error.message;
        res.status(500).json({
            message: msg,
            success: false
        });
    }
}

export const sendfriendrequest = async (req, res) => {
    try {
        const myid = req.user._id;
        const { id: recipientid } = req.params;
        
        console.log('Send friend request - Sender:', myid, 'Recipient:', recipientid);
        
        // Prevent sending friend request to yourself
        if (myid.toString() === recipientid) {
            return res.status(400).json({
                message: "Cannot send friend request to yourself",
                success: false
            });
        }
        
        // Check if recipient exists
        const recipient = await User.findById(recipientid);
        if (!recipient) {
            return res.status(400).json({
                message: "User not found with this recipient id",
                success: false
            });
        }
        
        // Check if already friends
        if (recipient.friends.includes(myid)) {
            return res.status(400).json({
                message: "You are already friends",
                success: false
            });
        }

        // Check if friend request already exists
        const existrequest = await FriendRequest.findOne({
            $or: [
                { sender: myid, receiver: recipientid },
                { sender: recipientid, receiver: myid }
            ]
        });
        
        if (existrequest) {
            return res.status(400).json({
                message: "Friend request already exists between you two",
                success: false,
            });
        }
        
        // Create new friend request
        const friendRequest = await FriendRequest.create({
            sender: myid,
            receiver: recipientid,
        });
        
        console.log('✅ Friend request created:', friendRequest);
        
        res.status(200).json({
            message: "Friend request sent successfully",
            data: friendRequest,
            success: true
        });
    } catch (error) {
        console.error('❌ Error in sendfriendrequest:', error);
        const msg = error.message;
        res.status(500).json({
            message: msg,
            success: false
        });
    }
}

export const acceptfriendrequest=async(req,res)=>{
    try{
        const{id:requestid}=req.params

        const request = await FriendRequest.findById(requestid);

        if (!request) {
            return res.status(404).json({
                message: "Friend request not found",
                success: false
            });
        }

        // verify the current user is the recipient
        if(request.receiver.toString()!=req.user._id.toString()){
            return res.status(403).json({
                message:"You are not authorized to accept this request",
                success:false
            })
        }

        if (request.status === "approved") {
            return res.status(200).json({
                message: "Friend request already accepted",
                data: request,
                success: true
            })
        }
        request.status="approved"
        await request.save();

        // after sending friend request we need to add to array of user in friends

        await User.findByIdAndUpdate(request.sender,{
            $addToSet:{friends:request.receiver}
        })

        await User.findByIdAndUpdate(request.receiver,{
            $addToSet:{
        friends:request.sender
            }
        })
res.status(200).json({
    message:"Friend request Accepted ",
    data:request,
    success:true
})

    }

    catch(error){
        const msg=error.message
        return res.status(500).json({
            message:msg ,
            success:false
        })

    }

}

export const getfriendrequest = async (req, res) => {
  try {
    // Fetch incoming friend requests (requests sent to current user)
    const incomingReqs = await FriendRequest.find({
      receiver: req.user._id,
      status: "pending",
    }).populate("sender", "fullname profilepic nativelanguage learninglanguage bio location");

    // Fetch accepted friend requests (sent by current user and approved)
    const acceptedReqs = await FriendRequest.find({
      sender: req.user._id,
      status: "approved",
    }).populate("receiver", "fullname profilepic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getfriendrequest controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOutgoingFriendReqs = async (req, res) => {
  try {
    // Fetch outgoing (sent but not yet approved) friend requests
    const outgoingRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate("receiver", "fullname profilepic nativelanguage learninglanguage");

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const rejectfriendrequest = async (req, res) => {
  try {
    const { id: requestid } = req.params;

    const request = await FriendRequest.findById(requestid);

    if (!request) {
      return res.status(404).json({
        message: "Friend request not found",
        success: false
      });
    }

    // verify the current user is the recipient
    if (request.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to reject this request",
        success: false
      });
    }

    // Delete the friend request instead of updating status
    await FriendRequest.findByIdAndDelete(requestid);

    res.status(200).json({
      message: "Friend request rejected",
      success: true
    });

  } catch (error) {
    const msg = error.message;
    return res.status(500).json({
      message: msg,
      success: false
    });
  }
};

// ✅ Accept friend request controller (optional but recommended)
