import { getApperClient } from "@/services/apperClient"
import { toast } from "react-toastify"

export const activityService = {
  async getAll() {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const response = await apperClient.fetchRecords('activity_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "timestamp_c"}},
          {"field": {"Name": "deal_id_c"}},
          {"field": {"Name": "contact_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        orderBy: [{"fieldName": "timestamp_c", "sorttype": "DESC"}]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error("Error fetching activities:", error?.message || error)
      return []
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const response = await apperClient.getRecordById('activity_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "timestamp_c"}},
          {"field": {"Name": "deal_id_c"}},
          {"field": {"Name": "contact_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      return response.data
    } catch (error) {
      console.error(`Error fetching activity ${id}:`, error?.message || error)
      return null
    }
  },

  async create(activityData) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const params = {
        records: [
          {
            Name: activityData.description_c || activityData.subject || "",
            type_c: activityData.type_c || activityData.type || "call",
            description_c: activityData.description_c || activityData.subject || "",
            timestamp_c: activityData.timestamp_c || activityData.date || new Date().toISOString(),
            contact_id_c: activityData.contact_id_c ? parseInt(activityData.contact_id_c) : (activityData.contactId ? parseInt(activityData.contactId) : null),
            deal_id_c: activityData.deal_id_c || activityData.dealId || null
          }
        ]
      }

      const response = await apperClient.createRecord('activity_c', params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to create activity:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        const successful = response.results.filter(r => r.success)
        return successful[0]?.data || null
      }

      return null
    } catch (error) {
      console.error("Error creating activity:", error?.message || error)
      return null
    }
  },

  async update(id, activityData) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: activityData.description_c || activityData.subject || "",
            type_c: activityData.type_c || activityData.type || "call",
            description_c: activityData.description_c || activityData.subject || "",
            timestamp_c: activityData.timestamp_c || activityData.date || new Date().toISOString(),
            contact_id_c: activityData.contact_id_c ? parseInt(activityData.contact_id_c) : (activityData.contactId ? parseInt(activityData.contactId) : null),
            deal_id_c: activityData.deal_id_c || activityData.dealId || null
          }
        ]
      }

      const response = await apperClient.updateRecord('activity_c', params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to update activity:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        const successful = response.results.filter(r => r.success)
        return successful[0]?.data || null
      }

      return null
    } catch (error) {
      console.error("Error updating activity:", error?.message || error)
      return null
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const response = await apperClient.deleteRecord('activity_c', {
        RecordIds: [parseInt(id)]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to delete activity:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return false
        }
        return true
      }

      return false
    } catch (error) {
      console.error("Error deleting activity:", error?.message || error)
      return false
    }
  }
}