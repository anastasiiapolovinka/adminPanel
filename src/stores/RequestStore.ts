import { makeAutoObservable } from 'mobx'
import { Request, Status } from '../types'

class RequestStore {
  requests: Request[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setRequests(requests: Request[]) {
    this.requests = requests
  }

  approveRequest(requestId: number) {
    this.updateRequestStatus(requestId, 'approved')
  }

  rejectRequest(requestId: number) {
    this.updateRequestStatus(requestId, 'rejected')
  }

  updateRequestStatus(requestId: number, status: Status) {
    const request = this.requests.find((req) => req.id === requestId)
    if (request) {
      request.status = status
    }
  }

  updateRequest(
    requestId: number,
    payload: Pick<Request, 'materialName' | 'category' | 'unit' | 'quantity'>
  ) {
    this.requests = this.requests.map((req) => {
      let updatedRequest = req
      if (req.id === requestId) {
        updatedRequest = {
          ...req,
          ...payload,
        }
      }
      return updatedRequest
    })
  }

  addCommentToRequest(requestId: number, comment: string) {
    const request = this.requests.find((req) => req.id === requestId)
    if (request) {
      request.comments.push({ id: Math.random(), text: comment })
    }
  }

  findRequestById(requestId: number) {
    return this.requests.find((req) => req.id === requestId)
  }
}

export const requestStore = new RequestStore()
